using Authentication.Enum;
using Microsoft.Extensions.DependencyInjection;

namespace Authentication.Interfaces
{
    public class AuthenticationFactory:IAuthenticationFactory
    {
        private readonly IServiceProvider _serviceProvider;

        public AuthenticationFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        

        ICredAuthentication IAuthenticationFactory.CreateCredLogin()
        {
            return _serviceProvider.GetRequiredService<ICredAuthentication>();
        }

        IGoogleAuthenticationService IAuthenticationFactory.CreateGoogleLogin()
        {
            return _serviceProvider.GetRequiredService<IGoogleAuthenticationService>();
        }
    }

}
  

