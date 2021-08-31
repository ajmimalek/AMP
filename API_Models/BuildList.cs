using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.API_Models
{
    public class BuildList
    {
        public string nextHref { get; set; }
        public Build[] build { get; set; }
    }

    public class Build
    {
        public int id { get; set; }
        public string status { get; set; }
    }

}
