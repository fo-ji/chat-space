# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false, index|
### Association
- has_many :messages
- has_many :groups, through: :groups_users
- has_many :photos

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false, index|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :users, through: :groups_users
- has_many :messages
- has_many :photos

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false, index|
|image|string|index|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|photo_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
- has_many :photos, through: :messages_photos

## photosテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|null: false, index|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
- has_many :messages, through: :messages_photos

## messages_photosテーブル
|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false, foreign_key: true|
|photo_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :message
- belongs_to :photo