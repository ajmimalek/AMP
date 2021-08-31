using AMP.Dtos;
using AMP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Data
{
    public interface ITeamCityRepository
    {
        Build GetBuildById(int id);
        Changes GetBuildChanges(int id);
        CodeCoverage GetCodeCoverage(int id);
        CodeInspections GetCodeInspections(int id);
        List<Builds> GetSuccessfulBuilds();
        List<Builds> GetFailedBuilds();
        List<Builds> GetBuilds();
        BuildDashboard GetDashboard();
    }
}
