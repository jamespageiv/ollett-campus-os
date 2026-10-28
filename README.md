# Campus OS microsite on Heroku

Static site (public/index.html) served by a zero-dependency Node server. Optional password gate.

## Deploy (Heroku CLI)

    cd follett-campus-os-heroku
    git init && git add . && git commit -m "Campus OS"
    heroku create follett-campus-os        # pick any free name
    heroku config:set SITE_PASSWORD='choose-a-password'   # optional, recommended
    git push heroku HEAD:main
    heroku open

Login when prompted: user `follett` (override with SITE_USER) and your password.

## Update
Replace public/index.html, then commit and `git push heroku HEAD:main`.

## Notes
- Internal concept for the Follett strategy day. Keep the password on until it is ready to share more widely.
- Search engines are told not to index it (X-Robots-Tag).
- Needs only Node 20. Heroku Eco dynos sleep when idle; first load can take a few seconds.
