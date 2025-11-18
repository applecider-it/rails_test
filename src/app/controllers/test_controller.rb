class TestController < ApplicationController
  def index
  end

  def backend_test
    test_service = TestServices::TestService.new
    test_service.test

    render :complate
  end

  def react_test
    @name = "Test!!"
  end
end
