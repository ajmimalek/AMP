using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.API_Models
{

    public class BuildStats
    {
        public int count { get; set; }
        public Property1[] property { get; set; }
    }

    public class Property1
    {
        public string name { get; set; }
        public string value { get; set; }
    }

}
