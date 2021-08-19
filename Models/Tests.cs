using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class Tests
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public int Duration { get; set; }
        //FK : Build
        public Build Build { get; set; }
        public int BuildFK { get; set; }
    }
}
