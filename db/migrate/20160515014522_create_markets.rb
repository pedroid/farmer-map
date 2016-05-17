class CreateMarkets < ActiveRecord::Migration
  def change
    create_table :markets do |t|
      t.text :name
      t.text :period
      t.text :description
      t.text :location
      t.integer :county_id
      t.integer :town_id
      t.text :address
      t.integer :starttime_id
      t.integer :endtime_id
      t.text :website
      t.text :building

      t.timestamps null: false
    end
  end
end
