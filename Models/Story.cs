using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class Story
    {
        [JsonIgnore] public int Id { get; set; }
        public string Key { get; set; }
        public bool Closed { get; set; }
        public string PriorityName { get; set; }
        public string PriorityIcon { get; set; }
        public string AssigneeName { get; set; }
        public string AssigneeAvatar { get; set; }
        public string Status { get; set; }
        public int Progress { get; set; }
        public string TimeSpent { get; set; }
        public string Description { get; set; }
        public string Created { get; set; }
        public string Updated { get; set; }
        public string DueDate { get; set; }
        public string Epic { get; set; }
        //FK : Tasks
        public List<Task> tasks { get; set; }
    }
}
