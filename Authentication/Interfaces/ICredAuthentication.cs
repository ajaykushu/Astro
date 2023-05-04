using Authentication.Model;
using DataAccessLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authentication.Interfaces
{
    public interface ICredAuthentication
    {
        public Task<User> LoginUsingCred(string username, string password);
    }
}
