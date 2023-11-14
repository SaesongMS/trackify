import { Text, Pressable, FlatList } from 'react-native';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {View} from 'react-native';

import { API_URL } from "@env";

export default function Page() {

    const [userID, setUserID] = useState(null);
    const [username, setUsername] = useState(null);
    const [user, setUser] = useState([]);

    const auth = async () => {
        try{
            const response = await axios.post(`${API_URL}/api/users/login`, {
                username:"user123",
                password:"123456"
            });
            setUserID(response.data.id);
        }catch(e){
            console.log("line 20: " + e);
        }
    }

    const getUsername = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users/user`);
            setUsername(response.data.user);  
        } catch (error) {
            console.log("line 30: " + error);
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users/${username}`);
            setUser(response.data);
        } catch (error) {
            console.log("line 30: " + error);
        }
    }

    useEffect(() => {
        auth();
    });

    useEffect(() => {
        if (userID) {
            getUsername();
        }
    }, [userID]);

    useEffect(() => {
        if (username) {
            getUser();
        }
    }, [username]);

  return(
    <View>
        <Text>Test</Text>
        {userID && <Text>User ID: {userID}</Text>}
        {username && <Text>User: {username}</Text>}
        {user && <FlatList
            data={user.scrobbles}
            renderItem={({item}) => (
                <Text>{item.song.title}</Text>
            )}
            />}

    </View>
  )
}
