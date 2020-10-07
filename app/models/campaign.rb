class Campaign < ApplicationRecord
  enum status: %i(draft sending sent)
end
