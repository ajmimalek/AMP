using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class CodeCoverage
    {
        public int Id { get; set; }
        public int ClassCovered { get; set; }
        public int ClassNonCovered { get; set; }
        public int ClassTotal { get; set; }
        public float ClassPercent { get; set; }
        public int MethodCovered { get; set; }
        public int MethodNonCovered { get; set; }
        public int MethodTotal { get; set; }
        public float MethodPercent { get; set; }
        public int StatementCovered { get; set; }
        public int StatementNonCovered { get; set; }
        public int StatementTotal { get; set; }
        public float StatementPercent { get; set; }
        //FK : Build
        public Build Build { get; set; }
        public int BuildFK { get; set; }
    }
}
