# API-only app has no asset pipeline. Define no-ops so Render's build doesn't fail.
Rake::Task.define_task("assets:precompile")
Rake::Task.define_task("assets:clean")
