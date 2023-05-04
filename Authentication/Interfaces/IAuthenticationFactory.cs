using Authentication.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authentication.Interfaces
{
    public interface IAuthenticationFactory
    {
        public IGoogleAuthenticationService CreateGoogleLogin();
        public ICredAuthentication CreateCredLogin();
        
    }
}
