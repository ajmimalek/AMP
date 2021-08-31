using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Dtos
{
    public class Builds
    {
        public int id { get; set; }
        public string status { get; set; }
        public string UserName { get; set; }

        public Builds(int id, string status, string userName)
        {
            this.id = id;
            this.status = status;
            UserName = userName;
        }
    }
}
