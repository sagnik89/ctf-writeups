# Writeups

This is where I keep writeups from boxes I've rooted, CTFs I've played, and labs I've worked through — HackTheBox, TryHackMe, picoCTF, PortSwigger's Web Security Academy, and a handful of independent CTF events.

## Structure

```
.
├── boot2root/          # HTB & THM machine walkthroughs
├── ctfs/                # CTF competition writeups
├── pico-playlists/      # picoCTF guided playlists
└── portswigger-labs/    # PortSwigger Web Security Academy labs
```

### `boot2root/`
Full box walkthroughs, enumeration through root, with screenshots along the way.

| Machine | Platform |
|---|---|
| [Basic Pentesting 1](boot2root/basic_pentesting_1/README.md) | VulnHub |
| [Blue](boot2root/Blue_THM/Blue_THM.md) | TryHackMe |
| [Cap](boot2root/cap_HTB/README.md) | HackTheBox |
| [NetSec Challenge](boot2root/NetSec_THM/NetSec_challenge_THM.md) | TryHackMe |
| [Nexus](boot2root/nexus_HTB/README.md) | HackTheBox |
| [Silentium](boot2root/silentium_HTB/README.md) | HackTheBox |
| [Vulnerability Capstone](boot2root/Vuln_Capstone_THM/Vulnerability_Capstone_THM.md) | TryHackMe |

### `ctfs/`
Writeups from CTFs I've played — plus Hack With Jolu, an event I helped organize and run.

| Event |
|---|
| [AthenaCTF '26](ctfs/AthenaCTF_26/README.md) |
| [BugCrowd CTF '25](ctfs/BugCrowdCTF_25/README.md) |
| [CloudSEK CTF '26](ctfs/CloudSEKCTF_26/README.md) |
| [Hack With Jolu '25](ctfs/Hack_With_Jolu_25/README.md) |
| [HoneyBadger CTF '26](ctfs/HoneyBadgerCTF_26/README.md) |
| [Rick & Morty CTF (THM)](ctfs/rickMortyCTF_THM/rickMortyCTF_THM.md) |
| [Trivarna CTF '26](ctfs/TrivarnaCTF_26/README.md) |
| [zeroday CTF '25](ctfs/zerodayCTF_25/README.md) |

| Event | Notes |
|---|---|
| AthenaCTF '26 | |
| BugCrowd CTF '25 | |
| CloudSEK CTF '26 | |
| Hack With Jolu '25 | |
| HoneyBadger CTF '26 | |
| Rick & Morty CTF (THM) | |
| Trivarna CTF '26 | |
| zeroday CTF '25 | Full challenge set included (crypto, forensics, misc, OSINT, web) |

### `pico-playlists/`
Working through picoCTF's guided playlists, one category at a time.

- [Forensics I–IV](pico-playlists/forensics-playlist/README.md) — file analysis, disk forensics with Sleuth Kit, steganography, packet capture analysis

### `portswigger-labs/`
Lab solutions from the Web Security Academy, grouped by vulnerability class:

- [API testing](portswigger-labs/api-testing-labs/README.md)
- [Authentication](portswigger-labs/auth-labs/README.md)
- [Business logic vulnerabilities](portswigger-labs/business-logic-labs/README.md)
- [OS command injection](portswigger-labs/os-command-injection-labs/README.md)
- [SQL injection](portswigger-labs/sql-injection-labs/README.md)

## Format

Most writeups follow the same rough shape: recon, exploitation, post-exploitation, with commands and screenshots along the way and the flag at the end as proof it actually worked.
