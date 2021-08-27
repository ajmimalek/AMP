using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.API_Models
{

    public class IssueDetails
    {
        public string expand { get; set; }
        public int startAt { get; set; }
        public int maxResults { get; set; }
        public int total { get; set; }
        public Issue[] issues { get; set; }
    }

    public class Issue
    {
        public string expand { get; set; }
        public string id { get; set; }
        public string self { get; set; }
        public string key { get; set; }
        public Fields fields { get; set; }
    }

    public class Fields
    {
        public Fixversion[] fixVersions { get; set; }
        public Resolution resolution { get; set; }
        public object customfield_10500 { get; set; }
        public object customfield_12404 { get; set; }
        public long customfield_12800 { get; set; }
        public object customfield_10501 { get; set; }
        public object customfield_12403 { get; set; }
        public object lastViewed { get; set; }
        public string customfield_12000 { get; set; }
        public Priority priority { get; set; }
        public object customfield_12400 { get; set; }
        public object customfield_12402 { get; set; }
        public object[] labels { get; set; }
        public object customfield_12401 { get; set; }
        public string customfield_11700 { get; set; }
        public object timeestimate { get; set; }
        public object aggregatetimeoriginalestimate { get; set; }
        public object[] versions { get; set; }
        public object[] issuelinks { get; set; }
        public Assignee assignee { get; set; }
        public Status status { get; set; }
        public Component[] components { get; set; }
        public object customfield_11300 { get; set; }
        public int customfield_10601 { get; set; }
        public object customfield_12901 { get; set; }
        public object customfield_12900 { get; set; }
        public object aggregatetimeestimate { get; set; }
        public object customfield_10604 { get; set; }
        public object customfield_12902 { get; set; }
        public Creator creator { get; set; }
        public Subtask[] subtasks { get; set; }
        public Reporter reporter { get; set; }
        public object customfield_12101 { get; set; }
        public object customfield_12100 { get; set; }
        public Aggregateprogress aggregateprogress { get; set; }
        public object[] customfield_12103 { get; set; }
        public object customfield_12102 { get; set; }
        public object customfield_12105 { get; set; }
        public object customfield_12104 { get; set; }
        public object customfield_12500 { get; set; }
        public Closedsprint[] closedSprints { get; set; }
        public Progress progress { get; set; }
        public Votes votes { get; set; }
        public Worklog worklog { get; set; }
        public Issuetype issuetype { get; set; }
        public object timespent { get; set; }
        public Project project { get; set; }
        public object aggregatetimespent { get; set; }
        public object customfield_12601 { get; set; }
        public Customfield_10700 customfield_10700 { get; set; }
        public int customfield_12604 { get; set; }
        public int customfield_12603 { get; set; }
        public DateTime resolutiondate { get; set; }
        public int workratio { get; set; }
        public Watches watches { get; set; }
        public DateTime created { get; set; }
        public object customfield_10020 { get; set; }
        public object customfield_10021 { get; set; }
        public object customfield_10022 { get; set; }
        public object customfield_10023 { get; set; }
        public object customfield_10024 { get; set; }
        public object customfield_12201 { get; set; }
        public object customfield_10025 { get; set; }
        public object customfield_12600 { get; set; }
        public object customfield_10026 { get; set; }
        public object customfield_10016 { get; set; }
        public object customfield_10017 { get; set; }
        public object customfield_10018 { get; set; }
        public object customfield_11504 { get; set; }
        public Customfield_11900 customfield_11900 { get; set; }
        public object customfield_10019 { get; set; }
        public DateTime updated { get; set; }
        public object timeoriginalestimate { get; set; }
        public string description { get; set; }
        public object customfield_13000 { get; set; }
        public string customfield_10010 { get; set; }
        public string customfield_12310 { get; set; }
        public object customfield_10011 { get; set; }
        public object customfield_10012 { get; set; }
        public string customfield_12312 { get; set; }
        public object customfield_10013 { get; set; }
        public string customfield_12311 { get; set; }
        public object customfield_10014 { get; set; }
        public Timetracking timetracking { get; set; }
        public object customfield_10015 { get; set; }
        public string customfield_12313 { get; set; }
        public string[] customfield_10005 { get; set; }
        public string customfield_10006 { get; set; }
        public object customfield_12700 { get; set; }
        public object[] attachment { get; set; }
        public string customfield_12309 { get; set; }
        public bool flagged { get; set; }
        public string summary { get; set; }
        public object customfield_10000 { get; set; }
        public object customfield_10001 { get; set; }
        public int? customfield_10002 { get; set; }
        public string customfield_12300 { get; set; }
        public string customfield_10004 { get; set; }
        public object environment { get; set; }
        public object duedate { get; set; }
        public Comment comment { get; set; }
        public Epic epic { get; set; }
        public Parent parent { get; set; }
        public long customfield_11502 { get; set; }
        public Customfield_11500 customfield_11500 { get; set; }
    }

    public class Resolution
    {
        public string self { get; set; }
        public string id { get; set; }
        public string description { get; set; }
        public string name { get; set; }
    }

    public class Priority
    {
        public string self { get; set; }
        public string iconUrl { get; set; }
        public string name { get; set; }
        public string id { get; set; }
    }

    public class Assignee
    {
        public string self { get; set; }
        public string name { get; set; }
        public string key { get; set; }
        public string emailAddress { get; set; }
        public Avatarurls avatarUrls { get; set; }
        public string displayName { get; set; }
        public bool active { get; set; }
        public string timeZone { get; set; }
    }

    public class Avatarurls
    {
        public string _48x48 { get; set; }
        public string _24x24 { get; set; }
        public string _16x16 { get; set; }
        public string _32x32 { get; set; }
    }

    public class Status
    {
        public string self { get; set; }
        public string description { get; set; }
        public string iconUrl { get; set; }
        public string name { get; set; }
        public string id { get; set; }
        public Statuscategory statusCategory { get; set; }
    }

    public class Statuscategory
    {
        public string self { get; set; }
        public int id { get; set; }
        public string key { get; set; }
        public string colorName { get; set; }
        public string name { get; set; }
    }

    public class Creator
    {
        public string self { get; set; }
        public string name { get; set; }
        public string key { get; set; }
        public string emailAddress { get; set; }
        public Avatarurls1 avatarUrls { get; set; }
        public string displayName { get; set; }
        public bool active { get; set; }
        public string timeZone { get; set; }
    }

    public class Avatarurls1
    {
        public string _48x48 { get; set; }
        public string _24x24 { get; set; }
        public string _16x16 { get; set; }
        public string _32x32 { get; set; }
    }

    public class Reporter
    {
        public string self { get; set; }
        public string name { get; set; }
        public string key { get; set; }
        public string emailAddress { get; set; }
        public Avatarurls2 avatarUrls { get; set; }
        public string displayName { get; set; }
        public bool active { get; set; }
        public string timeZone { get; set; }
    }

    public class Avatarurls2
    {
        public string _48x48 { get; set; }
        public string _24x24 { get; set; }
        public string _16x16 { get; set; }
        public string _32x32 { get; set; }
    }

    public class Aggregateprogress
    {
        public int progress { get; set; }
        public int total { get; set; }
    }

    public class Progress
    {
        public int progress { get; set; }
        public int total { get; set; }
    }

    public class Votes
    {
        public string self { get; set; }
        public int votes { get; set; }
        public bool hasVoted { get; set; }
    }

    public class Worklog
    {
        public int startAt { get; set; }
        public int maxResults { get; set; }
        public int total { get; set; }
        public object[] worklogs { get; set; }
    }

    public class Issuetype
    {
        public string self { get; set; }
        public string id { get; set; }
        public string description { get; set; }
        public string iconUrl { get; set; }
        public string name { get; set; }
        public bool subtask { get; set; }
        public int avatarId { get; set; }
    }

    public class Project
    {
        public string self { get; set; }
        public string id { get; set; }
        public string key { get; set; }
        public string name { get; set; }
        public Avatarurls3 avatarUrls { get; set; }
    }

    public class Avatarurls3
    {
        public string _48x48 { get; set; }
        public string _24x24 { get; set; }
        public string _16x16 { get; set; }
        public string _32x32 { get; set; }
    }

    public class Customfield_10700
    {
        public string self { get; set; }
        public string name { get; set; }
        public string key { get; set; }
        public string emailAddress { get; set; }
        public Avatarurls4 avatarUrls { get; set; }
        public string displayName { get; set; }
        public bool active { get; set; }
        public string timeZone { get; set; }
    }

    public class Avatarurls4
    {
        public string _48x48 { get; set; }
        public string _24x24 { get; set; }
        public string _16x16 { get; set; }
        public string _32x32 { get; set; }
    }

    public class Watches
    {
        public string self { get; set; }
        public int watchCount { get; set; }
        public bool isWatching { get; set; }
    }

    public class Customfield_11900
    {
        public string self { get; set; }
        public string value { get; set; }
        public string id { get; set; }
    }

    public class Timetracking
    {
    }

    public class Comment
    {
        public Comment1[] comments { get; set; }
        public int maxResults { get; set; }
        public int total { get; set; }
        public int startAt { get; set; }
    }

    public class Comment1
    {
        public string self { get; set; }
        public string id { get; set; }
        public Author author { get; set; }
        public string body { get; set; }
        public Updateauthor updateAuthor { get; set; }
        public DateTime created { get; set; }
        public DateTime updated { get; set; }
    }

    public class Author
    {
        public string self { get; set; }
        public string name { get; set; }
        public string key { get; set; }
        public string emailAddress { get; set; }
        public Avatarurls5 avatarUrls { get; set; }
        public string displayName { get; set; }
        public bool active { get; set; }
        public string timeZone { get; set; }
    }

    public class Avatarurls5
    {
        public string _48x48 { get; set; }
        public string _24x24 { get; set; }
        public string _16x16 { get; set; }
        public string _32x32 { get; set; }
    }

    public class Updateauthor
    {
        public string self { get; set; }
        public string name { get; set; }
        public string key { get; set; }
        public string emailAddress { get; set; }
        public Avatarurls6 avatarUrls { get; set; }
        public string displayName { get; set; }
        public bool active { get; set; }
        public string timeZone { get; set; }
    }

    public class Avatarurls6
    {
        public string _48x48 { get; set; }
        public string _24x24 { get; set; }
        public string _16x16 { get; set; }
        public string _32x32 { get; set; }
    }

    public class Epic
    {
        public int id { get; set; }
        public string key { get; set; }
        public string self { get; set; }
        public string name { get; set; }
        public string summary { get; set; }
        public Color color { get; set; }
        public bool done { get; set; }
    }

    public class Color
    {
        public string key { get; set; }
    }

    public class Parent
    {
        public string id { get; set; }
        public string key { get; set; }
        public string self { get; set; }
        public Fields1 fields { get; set; }
    }

    public class Fields1
    {
        public string summary { get; set; }
        public Status1 status { get; set; }
        public Priority1 priority { get; set; }
        public Issuetype1 issuetype { get; set; }
    }

    public class Status1
    {
        public string self { get; set; }
        public string description { get; set; }
        public string iconUrl { get; set; }
        public string name { get; set; }
        public string id { get; set; }
        public Statuscategory1 statusCategory { get; set; }
    }

    public class Statuscategory1
    {
        public string self { get; set; }
        public int id { get; set; }
        public string key { get; set; }
        public string colorName { get; set; }
        public string name { get; set; }
    }

    public class Priority1
    {
        public string self { get; set; }
        public string iconUrl { get; set; }
        public string name { get; set; }
        public string id { get; set; }
    }

    public class Issuetype1
    {
        public string self { get; set; }
        public string id { get; set; }
        public string description { get; set; }
        public string iconUrl { get; set; }
        public string name { get; set; }
        public bool subtask { get; set; }
        public int avatarId { get; set; }
    }

    public class Customfield_11500
    {
        public string self { get; set; }
        public string name { get; set; }
        public string key { get; set; }
        public string emailAddress { get; set; }
        public Avatarurls7 avatarUrls { get; set; }
        public string displayName { get; set; }
        public bool active { get; set; }
        public string timeZone { get; set; }
    }

    public class Avatarurls7
    {
        public string _48x48 { get; set; }
        public string _24x24 { get; set; }
        public string _16x16 { get; set; }
        public string _32x32 { get; set; }
    }

    public class Fixversion
    {
        public string self { get; set; }
        public string id { get; set; }
        public string description { get; set; }
        public string name { get; set; }
        public bool archived { get; set; }
        public bool released { get; set; }
        public string releaseDate { get; set; }
    }

    public class Component
    {
        public string self { get; set; }
        public string id { get; set; }
        public string name { get; set; }
    }

    public class Subtask
    {
        public string id { get; set; }
        public string key { get; set; }
        public string self { get; set; }
        public Fields2 fields { get; set; }
    }

    public class Fields2
    {
        public string summary { get; set; }
        public Status2 status { get; set; }
        public Priority2 priority { get; set; }
        public Issuetype2 issuetype { get; set; }
    }

    public class Status2
    {
        public string self { get; set; }
        public string description { get; set; }
        public string iconUrl { get; set; }
        public string name { get; set; }
        public string id { get; set; }
        public Statuscategory2 statusCategory { get; set; }
    }

    public class Statuscategory2
    {
        public string self { get; set; }
        public int id { get; set; }
        public string key { get; set; }
        public string colorName { get; set; }
        public string name { get; set; }
    }

    public class Priority2
    {
        public string self { get; set; }
        public string iconUrl { get; set; }
        public string name { get; set; }
        public string id { get; set; }
    }

    public class Issuetype2
    {
        public string self { get; set; }
        public string id { get; set; }
        public string description { get; set; }
        public string iconUrl { get; set; }
        public string name { get; set; }
        public bool subtask { get; set; }
        public int avatarId { get; set; }
    }

    public class Closedsprint
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
