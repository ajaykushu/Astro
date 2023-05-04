using Authentication.Interfaces;
using Authentication.Model;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text.Json;
using Google.Apis;

namespace Authentication
{
    public class GoogleLogin : IGoogleAuthenticationService
    {
        private readonly string? ClientId = null;
        private readonly string? ClientSecret = null;
        private readonly string RefreshUrl = "https://oauth2.googleapis.com/token";
        private readonly string RedirectUrl = "http://localhost:4200/setToken";



        public GoogleLogin(string ClientId, string ClientSecret)
        {
            this.ClientId = ClientId ;
            this.ClientSecret = ClientSecret ;

        }

        public Task<AuthResponse> AuthenticateByCred(string username, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<AuthResponse> AuthenticateByGoogle(string code)
        {
            using (var http = new HttpClient())
            {
                var builder = new UriBuilder(this.RefreshUrl);
                builder.Query = $"client_id={this.ClientId}&client_secret={this.ClientSecret}&code={code}&grant_type={"authorization_code"}&redirect_uri={RedirectUrl}";
                var url = builder.ToString();
                http.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
                var result = await http.PostAsync(url, null).ConfigureAwait(false);
                if (result != null && result.IsSuccessStatusCode)
                {

                    var authResponse = JsonConvert.DeserializeObject<AuthResponse>(await result.Content.ReadAsStringAsync());
                    if (authResponse != null)
                    {
                        return authResponse;
                    }
                    throw new Exception("Auth request failed");
                }
                throw new ArgumentException("invalid auth code");

            }
        }

    }
}