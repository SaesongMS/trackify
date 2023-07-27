using Microsoft.AspNetCore.Identity;
using DTOs;
using Models;
using System.Drawing.Imaging;
using System.Drawing;

namespace Helpers
{
    public class AuthenticationService
    {
        UserManager<User> _userManager;
        SignInManager<User> _signInManager;

        public AuthenticationService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<bool> Register(RegisterRequest registerRequest)
        {
            var user = new User
            {
                Email = registerRequest.Email,
                UserName = registerRequest.Username
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);

            if (result.Succeeded)
                return true;

            return false;
        }

        public async Task<bool> AddRole(string username, string role)
        {
            var user = await _userManager.FindByNameAsync(username);
            var result = await _userManager.AddToRoleAsync(user, role);

            if (result.Succeeded)
                return true;

            return false;
        }

        public async Task<List<string>> GetRoles(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            var roles = await _userManager.GetRolesAsync(user);

            return roles.ToList();
        }

        public async Task<bool> Login(LoginRequest loginRequest)
        {
            var result = await _signInManager.PasswordSignInAsync(loginRequest.Username, loginRequest.Password, false, false);

            if (result.Succeeded)
            {
                return true;
            }

            return false;
        }

        public async Task<User> GetUser(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            return user;
        }

        public static byte[] getDeafultAvatar()
        {
            Image image = Image.FromFile("avatar.jpg");
            ImageConverter imageConverter = new ImageConverter();
            byte[] imageByte = (byte[])imageConverter.ConvertTo(image, typeof(byte[]));
            return imageByte;
        }
    }
}