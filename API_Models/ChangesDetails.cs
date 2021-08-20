using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.API_Models
{

    public class ChangesDetails
    {
        public int id { get; set; }
        public string username { get; set; }
        public string date { get; set; }
        public string webUrl { get; set; }
        public string comment { get; set; }
        public Files files { get; set; }
    }

    public class Files
    {
        public File[] file { get; set; }
    }

    public class File
    {
        public string changeType { get; set; }
        public string file { get; set; }
    }

}
