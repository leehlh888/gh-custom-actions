const core = require('@actions/core');
// const github = require('@actions/github');   // to call github API
const exec = require('@actions/exec');

function run() {
// get inputs from action.yml
  const bucket = core.getInput('bucket', {required: true})
  const bucketRegion = core.getInput('bucket-region', {required: true})
  const distFolder = core.getInput('dist-folder', {required: true})

// upload files  
// use AWS CLI to upload files to S3 bucket, CLI installed by default in Ubuntu runner
  const s3Uri = `s3://${bucket}`
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)

//  core.notice('hi! my javascript github action')
  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput('website-url', websiteUrl);

  // can get the action details by this syntax
  // github.context.action
}

run();
