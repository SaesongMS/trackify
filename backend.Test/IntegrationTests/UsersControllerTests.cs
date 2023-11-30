using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Controllers;
using Models;
using Services;
using Helpers;
using DTOs;

namespace backend.Test.IntegrationTests
{
    [TestFixture]
    public class UsersControllerIntegrationTests
    {
        private WebApplicationFactory<Program> _factory;
        private HttpClient _client;

        [SetUp]
        public void SetUp()
        {
            _factory = new WebApplicationFactory<Program>();
            _client = _factory.CreateClient();
        }

        [TearDown]
        public void TearDown()
        {
            _client.Dispose();
            _factory.Dispose();
        }

        [Test]
        public async Task Register_ValidRequest_ReturnsOk()
        {
            // Arrange
            var registerRequest = new RegisterRequest
            {
                Email = "test@test.com",
                Username = "testuser",
                Password = "123456",
                ConfirmPassword = "123456"
            };
            var content = new StringContent(JsonConvert.SerializeObject(registerRequest), Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/api/users/register", content);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            var responseContent = await response.Content.ReadAsStringAsync();
            var registerResponse = JsonConvert.DeserializeObject<RegisterResponse>(responseContent);
            Assert.IsTrue(registerResponse.Success);
            Assert.AreEqual("Registration successful", registerResponse.Message);
        }

        [Test]
        public async Task Register_InvalidRequest_ReturnsBadRequest()
        {
            // Arrange
            var registerRequest = new RegisterRequest
            {
                Email = "",
                Username = "",
                Password = "",
                ConfirmPassword = ""
            };
            var content = new StringContent(JsonConvert.SerializeObject(registerRequest), Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/api/users/register", content);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
            var responseContent = await response.Content.ReadAsStringAsync();
            var registerResponse = JsonConvert.DeserializeObject<ValidationProblemDetails>(responseContent);
            Assert.IsTrue(registerResponse.Status == 400);
            Assert.IsTrue(registerResponse.Errors.ContainsKey("Email"));
            Assert.IsTrue(registerResponse.Errors.ContainsKey("Username"));
            Assert.IsTrue(registerResponse.Errors.ContainsKey("Password"));
            Assert.IsTrue(registerResponse.Errors.ContainsKey("ConfirmPassword"));

        }

        [Test]
        public async Task Login_ValidRequest_ReturnsOk()
        {
            // Arrange
            var loginRequest = new LoginRequest
            {
                Username = "ccc",
                Password = "123456"
            };
            var content = new StringContent(JsonConvert.SerializeObject(loginRequest), Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/api/users/login", content);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            var responseContent = await response.Content.ReadAsStringAsync();
            var loginResponse = JsonConvert.DeserializeObject<LoginResponse>(responseContent);
            Assert.IsTrue(loginResponse.Success);
        }

        [Test]
        public async Task Login_InvalidRequest_ReturnsBadRequest()
        {
            // Arrange
            var loginRequest = new LoginRequest
            {
                Username = "",
                Password = ""
            };
            var content = new StringContent(JsonConvert.SerializeObject(loginRequest), Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/api/users/login", content);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
            var responseContent = await response.Content.ReadAsStringAsync();
            var loginResponse = JsonConvert.DeserializeObject<LoginResponse>(responseContent);
            Assert.IsFalse(loginResponse.Success);
        }
    }
}