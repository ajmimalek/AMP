using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Dtos
{
    public class BuildDashboard
    {
        public int BuildSuccess { get; set; }
        public int BuildFailure { get; set; }
    }
}
