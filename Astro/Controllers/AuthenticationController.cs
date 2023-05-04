using Authentication.Interfaces;
using Authentication.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Astro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationFactory login;
        public  AuthenticationController(IAuthenticationFactory login)
        {
            this.login = login;
        }

        [HttpGet("getAccessToken")]
        public async Task<AuthResponse> GetAccessToken(string code)
        {
            return await login.CreateGoogleLogin().AuthenticateByGoogle(code);
           
        }
        [HttpPost("getAccessToken")]
        public async Task<AuthResponse> GetAccessToken([FromBody]string username,string password)
        {
            var obj= await login.CreateCredLogin().LoginUsingCred(username:username,password:password);
            return null;

        }

    }
}
