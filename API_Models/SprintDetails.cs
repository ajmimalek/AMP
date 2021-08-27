using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.API_Models
{

    public class SprintDetails
    {
        public int maxResults { get; set; }
        public int startAt { get; set; }
        public bool isLast { get; set; }
        public Value[] values { get; set; }
    }

    public class Value
    {
        public int id { get; set; }
        public string self { get; set; }
        public string state { get; set; }
        public string name { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public DateTime completeDate { get; set; }
        public int originBoardId { get; set; }
        public string goal { get; set; }
    }

}
