require_relative 'lib/famalam'

Gem::Specification.new do |s|
  s.name        = 'famalam'
  s.version     = FAMalam::version
  s.required_ruby_version = '>= 2.0.0'
  s.date        = Time.now.to_s.split(/\s/)[0]
  s.summary     = "FAM web-interface"
  s.description = "FAMalam is a front end web interface for FAM"
  s.authors     = ["Demonstrandum"]
  s.email       = 'knutsen@jetspace.co'
  s.files       = Dir.glob("{lib,public,views}/**/*") + %w(LICENSE README.md)
  s.require_path= 'lib'
  s.add_dependency 'unicorn', '~> 5.1', '>= 5.1.0'
  s.add_dependency 'fam', '~> 0.1', '>= 0.1.1'
  s.add_dependency 'haml', '~> 5.0', '>= 5.0.4'
  s.add_dependency 'sinatra', '~> 2.0', '>= 2.0.1'
  s.homepage    = 'https://github.com/Demonstrandum/FAM'
  s.license     = 'GPL-2.0'
end
