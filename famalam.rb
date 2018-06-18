#!/usr/bin/env ruby
require 'famalam'
require 'sinatra'
require 'rack/ssl' #
use Rack::SSL 

configure do
  use Rack::Session::Pool
end

set :server, 'unicorn'
set :port, 4567
set :threads, []

get '/' do
  haml :index
end

post '/program' do
  code = params[:code]
  session[:code] = code
  session[:clock] = params[:clock] || 2
  session[:alloc] = params[:alloc] || 120

  lexed  = FAM::Syntax::Lexer.lex code
  parsed = FAM::Syntax::Parser.parse lexed.tokens
  tree = parsed.ast
  ram = FAM::Machine::RAM.new session[:alloc]
  cpu = FAM::Machine::CPU.new ram

  session[:cpu] = cpu
  session[:tree] = tree
  session[:running] = true
end

post '/program/input' do
  session[:input] = params[:input].to_i || -1  # #to_i won't work for chars, use #ord IF char
  session[:cpu].inject_input session[:input]
end

get '/program/step.json' do
  response = {}
  puts "code: #{session[:code]}"
  unless session[:cpu].nil?
    status = session[:cpu].step session[:tree]
    if status[:state] == 'running'
      content_type :json
      response = {
        :ram => session[:cpu].ram.to_a,
        :registers  => session[:cpu].registers,
        :running => session[:running],
        :output => status[:output] ? session[:cpu].output : '',
        :inputting => status[:input]
      }
      session[:cpu].inject_input session[:input]
    else
      response = { :ERROR => 'Program halted.' }
    end
  else
    response = { :ERROR => 'Code not sent!' }
  end
  response.to_json
end

get '/program' do
  haml :program
end

get '/.well-known/acme-challenge/:token' do
  status 200

  file_path = "/var/www/letsencrypt/.well-known/acme-challenge/#{params[:token].gsub ':', ''}"
  sleep 0.1 until File.exist? file_path

  file_contents = File.read file_path
  body file_contents
  file_contents
  return
end

