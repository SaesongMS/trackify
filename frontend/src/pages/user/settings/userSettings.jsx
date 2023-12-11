import { createEffect, createSignal, useContext } from "solid-js";
import { UserContext } from "../../../contexts/UserContext";
import { getData, patchData, postData } from "../../../getUserData";

function UserSettings() {
  const { user } = useContext(UserContext);
  const [bio, setBio] = createSignal("");
  const [oldBio, setOldBio] = createSignal("");
  const [avatar, setAvatar] = createSignal(null);
  const [connectedSpotify, setConnectedSpotify] = createSignal(false);
  const [loading, setLoading] = createSignal(true);

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI + "/user/settings";
  const SCOPES =
    "user-read-private user-read-email user-top-read user-read-playback-state user-read-recently-played";

  const generateRandomString = (length) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const codeVerifier = generateRandomString(64);
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const getCode = async () => {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem("code_verifier", codeVerifier);

    const params = {
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPES,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI.toString(),
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  const getSpotifyUserId = async (access_token) => {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await res.json();
    return data.id;
  };

  const getRefreshToken = async (code) => {
    let codeVerifier = localStorage.getItem("code_verifier");

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI.toString(),
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();

    const spotifyUserId = await getSpotifyUserId(response.access_token);

    const res = await postData(`users/connectSpotify`, {
      RefreshToken: response.refresh_token,
      Id_User_Spotify_API: spotifyUserId,
    });
    if (res.success) {
      setConnectedSpotify(true);
    } else {
      console.log(res.message);
    }
  };

  //dla przyszlej referencji
  // const getAccessToken = async (refresh_token) => {
  //     const res = await fetch("https://accounts.spotify.com/api/token", {
  //       method: "POST",
  //       body: new URLSearchParams({
  //         grant_type: "refresh_token",
  //         refresh_token: refresh_token,
  //         client_id: CLIENT_ID,
  //       }),
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   }

  createEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    if (code) {
      window.history.replaceState({}, document.title, "/user/settings");
      getRefreshToken(code);
    }
  });

  const handleSpotifyConnect = (e) => {
    e.preventDefault();
    getCode();
  };

  const handleSpotifyDisconnect = async (e) => {
    e.preventDefault();
    await patchData(`users/disconnectSpotify`, {});
    setConnectedSpotify(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  createEffect(async () => {
    if (user()) {
      const data = await getData(`users/${user().userName}`);
      setOldBio(data.description ? data.description : "");
      if (data.refreshToken.length > 0) setConnectedSpotify(true);
      setLoading(false);
    }
  });

  createEffect(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!user()) window.location.href = "/login";
  });
  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (avatar() || (bio() !== oldBio() && bio().trim() !== "")) {
      const response = await patchData(`users/${user().userName}`, {
        bio: bio() ? bio() : oldBio(),
        avatar: avatar() ? avatar() : "",
      });
      if (response.success) alert("Profile edited!");
      else console.log(response.message);
    } else alert("No changes made!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    window.location.href = "/user/settings/change-password";
  };

  return (
    <div class="mt-2 ml-2 text-white">
      <span class="text-2xl">User Settings</span>
      {loading() && <div class="text-xl">Loading...</div>}
      {!loading() && (
        <div class="flex flex-col">
          <form onsubmit={handleEditProfile} class="flex flex-col">
            <span class="text-xl">Description:</span>
            <input
              type="text"
              value={oldBio()}
              onInput={(e) => setBio(e.target.value)}
              class="text-slate-950 max-w-[200px]"
            />
            <span class="text-xl">Avatar:</span>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {avatar() && (
              <div>
                <span>Preview:</span>
                <div class="border-2 border-[#1e1f22] w-[25%] max-w- hover:border-slate-500 hover:rounded-sm transition-all duration-150 aspect-square">
                  <img src={avatar()} alt="Preview" />
                </div>
              </div>
            )}
            <input
              type="submit"
              value="Edit"
              class="p-1 border mt-1 ml-1 px-4 hover:cursor-pointer hover:bg-slate-700 hover:text-slate-100 max-w-[200px]"
            />
          </form>
          <button
            class={`p-1 border mt-1 ml-1 px-4 hover:cursor-pointer hover:bg-slate-700 hover:text-slate-100 max-w-[200px] ${
              connectedSpotify() ? "hidden" : ""
            }`}
            onClick={handleSpotifyConnect}
          >
            Connect Spotify
          </button>
          <button
            class={`p-1 border mt-1 ml-1 px-4 hover:cursor-pointer hover:bg-slate-700 hover:text-slate-100 max-w-[200px] ${
              connectedSpotify() ? "" : "hidden"
            }`}
            onClick={handleSpotifyDisconnect}
          >
            Disconnect Spotify
          </button>
          <button
            class="p-1 border mt-1 ml-1 px-4 hover:cursor-pointer hover:bg-slate-700 hover:text-slate-100 max-w-[200px]"
            onClick={handleChangePassword}
          >
            Change password
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSettings;
