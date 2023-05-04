using Authentication.Interfaces;
using Authentication.Model;
using DataAccessLayer.Entity;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authentication
{
    public class CredLogin : ICredAuthentication
    {
        private readonly IDataAccess _dataAccess;
        public CredLogin(IDataAccess dataAccess)
        {
            this._dataAccess= dataAccess;
        }

        public async Task<User> LoginUsingCred(string username, string password)
        {
            var result = await _dataAccess.GetWhereAsync<User>(x => x.Password == password && x.Email == username);
            var userObj=result.FirstOrDefault();
            if(userObj != null)
            {
                return userObj;
            }
            return null;
        }
    }
}
