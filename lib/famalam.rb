require 'fam'
require 'haml'

module FAMalam
  VERSIONS = { :major => 0, :minor => 0, :tiny => 1 }

  def self.version *args
    VERSIONS.flatten.select.with_index { |val, i| i.odd? }.join '.'
  end
end

Dir["#{File.dirname __FILE__}/famalam/*.rb"].each    { |f| require f }
