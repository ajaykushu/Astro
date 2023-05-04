using Authentication.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authentication.Interfaces
{
    public interface IGoogleAuthenticationService
    {
         Task<AuthResponse> AuthenticateByGoogle(string code);

    }
}
