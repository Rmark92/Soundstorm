# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180512001239) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tracks", force: :cascade do |t|
    t.string "title", null: false
    t.integer "artist_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "audio_file_name"
    t.string "audio_content_type"
    t.integer "audio_file_size"
    t.datetime "audio_updated_at"
    t.text "description", default: ""
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
