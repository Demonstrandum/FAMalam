require_relative 'lib/famalam'

Gem::Specification.new do |s|
  s.name        = 'famalam'
  s.version     = FAMalam::version
  s.required_ruby_version = '>= 2.0.0'
  s.executables << 'famalam'
  s.date        = Time.now.to_s.split(/\s/)[0]
  s.summary     = "FAM web-interface"
  s.description = "FAMalam is a front end web interface for FAM"
  s.authors     = ["Demonstrandum"]
  s.email       = 'knutsen@jetspace.co'
  s.files       = Dir.glob("{bin,lib}/**/*") + %w(LICENSE README.md DOC.md)
  s.require_path= 'lib'
  s.homepage    = 'https://github.com/Demonstrandum/FAM'
  s.license     = 'GPL-2.0'
end
