class TestController < ApplicationController
  def index
    test_service = TestServices::TestService.new
    test_service.test
  end
end
