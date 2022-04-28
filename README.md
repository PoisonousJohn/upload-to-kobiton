<p align="center">
  <a href="https://github.com/PoisonousJohn/upload-tokobiton/actions"><img alt="build status" src="https://github.com/PoisonousJohn/upload-to-kobiton/workflows/build-test/badge.svg"></a>
</p>

# Upload artifact to Kobiton

This action uploads artifact to [Kobiton](https://kobiton.com) app storage to use it for app testing

## Usage

```yaml
uses: PoisonousJohn/upload-to-kobiton@v1
with:
  kobitonLogin: ***
  kobitonKey: ***
  appId: ***
  artifactPath: ***
  fileName: ***
```
