using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.API_Models
{
    public class BuildDetails
    {
            public int id { get; set; }
            public string number { get; set; }
            public string status { get; set; }
            public string state { get; set; }
            public string branchName { get; set; }
            public string webUrl { get; set; }
            public string statusText { get; set; }
            public Buildtype buildType { get; set; }
            public string queuedDate { get; set; }
            public string startDate { get; set; }
            public string finishDate { get; set; }

        public class Buildtype
        {
            public string name { get; set; }
        }

    }
}
