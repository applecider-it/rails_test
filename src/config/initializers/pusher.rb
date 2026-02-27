require 'pusher'

Pusher.url = ENV['PUSHER_URL']

p("Pusher.url", Pusher.url)
