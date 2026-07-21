# Safe source archive procedure

Use this only when the owner intentionally wants a website source archive. It does not build or package Modeboard for customers.

## Preferred tracked-source archive

1. Confirm the intended branch and review `git status --short`. Uncommitted work is not included by `git archive`.
2. Check that no sensitive or machine-local path is tracked:

   ```sh
   git ls-files | rg '(^|/)(\.env($|\.)|\.DS_Store|node_modules|dist|test-results|\.wrangler|\.vscode|\.idea|\.agents|\.codex|.*\.zip$|.*\.dmg$|.*\.pkg$)'
   ```

3. If the check prints anything, review it and remove sensitive material from source control before archiving. Do not delete working files merely to make an archive.
4. From the repository root, write the archive to a separate owner-chosen folder:

   ```sh
   git archive --format=tar.gz --prefix=tideframe-site/ -o /owner/chosen/path/tideframe-site-source.tar.gz HEAD
   ```

5. List the archive without extracting it and confirm it contains only intended tracked source:

   ```sh
   tar -tzf /owner/chosen/path/tideframe-site-source.tar.gz
   ```

`git archive` excludes `.git`, ignored dependencies, build output, test results, Wrangler state, editor/AI-agent settings, caches, environment files, credentials, machine-specific binaries, and nested archives unless one of those files was deliberately tracked. The precheck catches the common unsafe tracked cases.

## Customer artifact boundary

The public customer artifact must come only from Modeboard's reviewed release pipeline. Before distribution, inspect the mounted DMG or archive and confirm it contains only the intended signed Modeboard distribution files. A website source archive, development build, test fixture, appcast staging folder, private key, or notarization credential must never be included.
