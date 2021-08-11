using AMP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Data
{
    public interface IUserRepository
    {
        User GetUserByEmail(string email);
        User GetUserById(Guid id);
    }
}
