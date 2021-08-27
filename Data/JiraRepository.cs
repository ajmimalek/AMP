using AMP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Data
{
    public class JiraRepository : IJiraRepository
    {
        public List<Sprint> GetSprints()
        {
            throw new NotImplementedException();
        }

        public List<Story> GetStoriesBySprint(int sprintId)
        {
            throw new NotImplementedException();
        }

        public List<Models.Task> GetTasksByStory(int storyId)
        {
            throw new NotImplementedException();
        }
    }
}
