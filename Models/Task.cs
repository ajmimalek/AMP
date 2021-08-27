using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Status { get; set; }
        public string PriorityName { get; set; }
        public string PriorityIcon { get; set; }
        //FK : Story
        public Story Story { get; set; }
    }
}
