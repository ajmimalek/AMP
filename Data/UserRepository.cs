using AMP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Data
{
    public class UserRepository : IUserRepository
    {
        //Injection de dépandances
        private readonly AMPContext _context;

        //Constructor
        public UserRepository(AMPContext context) => _context = context;

        public User GetUserByEmail(string email)
        {
            //API GET JIRA USER INFOS : to implement here when getting the access
            //We must Hash the password with Bcrypt...
            return _context.Users.FirstOrDefault(u => u.Email.Equals(email));
        }

        public User GetUserById(Guid id)
        {
            return _context.Users.FirstOrDefault(u => u.Id.Equals(id));
        }
    }
}
