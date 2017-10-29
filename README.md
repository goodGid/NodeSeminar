<p align="center">
  <a href="https://nodejs.org/">
    <img alt="Node.js" src="https://nodejs.org/static/images/logo-light.svg" width="400"/>
  </a>
</p>
<p align="center">
  <a title="CII Best Practices" href="https://bestpractices.coreinfrastructure.org/projects/29"><img src="https://bestpractices.coreinfrastructure.org/projects/29/badge"></a>
</p>

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js
uses an event-driven, non-blocking I/O model that makes it lightweight and
efficient. The Node.js package ecosystem, [npm][], is the largest ecosystem of
open source libraries in the world.

The Node.js project is supported by the
[Node.js Foundation](https://nodejs.org/en/foundation/). Contributions,
policies, and releases are managed under an
[open governance model](./GOVERNANCE.md).


### Official Resources

* [Website][]
* [Node.js Help][]
* [Contributing to the project][]
* IRC (node core development): [#node-dev on chat.freenode.net][]

### Unofficial Resources

* IRC (general questions): [#node.js on chat.freenode.net][]. Please see
<http://nodeirc.info/> for more information regarding the `#node.js` IRC
channel.

_Please note that unofficial resources are neither managed by (nor necessarily
endorsed by) the Node.js TSC. Specifically, such resources are not
currently covered by the [Node.js Moderation Policy][] and the selection and
actions of resource operators/moderators are not subject to TSC oversight._

## Release Types

The Node.js project maintains multiple types of releases:

* **Current**: Released from active development branches of this repository,
  versioned by [SemVer](http://semver.org/) and signed by a member of the
  [Release Team](#release-team).
  Code for Current releases is organized in this repository by major version
  number. For example: [v4.x](https://github.com/nodejs/node/tree/v4.x).
  The major version number of Current releases will increment every 6 months
  allowing for breaking changes to be introduced. This happens in April and
  October every year. Current release lines beginning in October each year have
  a maximum support life of 8 months. Current release lines beginning in April
  each year will convert to LTS (see below) after 6 months and receive further
  support for 30 months.
* **LTS**: Releases that receive Long-term Support, with a focus on stability
  and security. Every second Current release line (major version) will become an
  LTS line and receive 18 months of _Active LTS_ support and a further 12
  months of _Maintenance_. LTS release lines are given alphabetically
  ordered codenames, beginning with v4 Argon. LTS releases are less frequent
  and will attempt to maintain consistent major and minor version numbers,
  only incrementing patch version numbers. There are no breaking changes or
  feature additions, except in some special circumstances.
* **Nightly**: Versions of code in this repository on the current Current
  branch, automatically built every 24-hours where changes exist. Use with
  caution.

More information can be found in the [LTS README](https://github.com/nodejs/LTS/).

## Download

Binaries, installers, and source tarballs are available at
<https://nodejs.org>.

#### Current and LTS Releases
**Current** and **LTS** releases are available at
<https://nodejs.org/download/release/>, listed under their version strings.
The [latest](https://nodejs.org/download/release/latest/) directory is an
alias for the latest Current release. The latest LTS release from an LTS
line is available in the form: latest-_codename_. For example:
<https://nodejs.org/download/release/latest-argon>.

#### Nightly Releases
**Nightly** builds are available at
<https://nodejs.org/download/nightly/>, listed under their version
string which includes their date (in UTC time) and the commit SHA at
the HEAD of the release.

#### API Documentation
**API documentation** is available in each release and nightly
directory under _docs_. <https://nodejs.org/api/> points to the API
documentation of the latest stable version.


## Security

All security bugs in Node.js are taken seriously and should be reported by
emailing security@nodejs.org. This will be delivered to a subset of the project
team who handle security issues. Please don't disclose security bugs
publicly until they have been handled by the security team.

Your email will be acknowledged within 24 hours, and you’ll receive a more
detailed response to your email within 48 hours indicating the next steps in
handling your report.

There are no hard and fast rules to determine if a bug is worth reporting as
a security issue. The general rule is any issue worth reporting
must allow an attacker to compromise the confidentiality, integrity
or availability of the Node.js application or its system for which the attacker
does not already have the capability.

To illustrate the point, here are some examples of past issues and what the
Security Reponse Team thinks of them. When in doubt, however, please do send
us a report nonetheless.
