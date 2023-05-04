using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authentication.Model
{
    public class AuthResponse
    {
        [JsonProperty("access_token")]
        public  string? AccessToken { get; set; }
        [JsonProperty("id_token")]
        public string? IdentityToken { get; set; }
        [JsonProperty("scope")]
        public string? Scope { get; set; }
        [JsonProperty("profile")]
        public string? Profile { get; set; }
        [JsonProperty("email")]
        public string? Email { get; set; }  
        public string? TTL { get; set; }


    }
}
