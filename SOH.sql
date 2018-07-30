CREATE TABLE `Stories` (
  `storyId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `story` varchar(1000) DEFAULT NULL,
  `imageLink` varchar(200) DEFAULT NULL,
  `siteLink` varchar(200) DEFAULT NULL,
  `videoLink` varchar(200) DEFAULT NULL,
  `tags` varchar(200) DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`storyId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Tags` (
  `tag` varchar(50) NOT NULL,
  PRIMARY KEY (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Stories_Tags` (
  `storyId` int(11) NOT NULL,
  `tag` varchar(50) NOT NULL,
  KEY `storyId` (`storyId`),
  KEY `tag` (`tag`),
  CONSTRAINT `stories_tags_ibfk_1` FOREIGN KEY (`storyId`) REFERENCES `stories` (`storyid`) ON DELETE CASCADE,
  CONSTRAINT `stories_tags_ibfk_2` FOREIGN KEY (`tag`) REFERENCES `tags` (`tag`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_GetStories`(
	in p_tags varchar(150)
)
BEGIN
	declare strLen int default 0;
    declare substrLen int default 0;
    declare substr varchar(50);
    declare stories varchar(100);
    declare existingTagId int;
    create temporary table storyStore as (select * from stories limit 0);
    
	do_this: 
		loop 
            set substr = trim(substring_index(p_tags, "," , 1)); -- use this to insert into tags 
			insert into storyStore select * from stories where storyId in (select  storyId from Stories_Tags as st where st.tag = substr);

            -- loop iteration progress statements 
			set strLen = length(p_tags); 
            set substrLen = char_length(substring_index(p_tags, ",", 1)) + 2;
			set p_tags = mid(p_tags, substrLen,strLen);
            
			if p_tags = '' then
				leave do_this;
			end if;
        
	end loop do_this;
    select distinct * from storyStore;
    drop table storyStore;
END
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_InsertStory`(
	in p_title varchar(100),
    in p_story varchar(1000),
    in p_imageLink varchar(500),
    in p_siteLink varchar(200),
    in p_videoLink varchar(200),
	in p_tags varchar(150),
    in p_code varchar(10)
)
BEGIN
	declare strLen int default 0;
    declare substrLen int default 0;
    declare tagtoInsert varchar(50);
    declare storyIdInsert int;
	declare existingTag varchar(50);
    
	insert into Stories (title, story, imageLink, siteLink, videoLink, tags, code) 
    values (p_title, p_story, p_imageLink, p_siteLink, p_videoLink, p_tags, p_code);
    
    set storyIdInsert = last_insert_id();
  
    do_this:
		loop 
			set tagtoInsert = trim(substring_index(p_tags, "," , 1)); -- use this to insert into tags 
            set existingTag = (select tag from Tags where tag = tagtoInsert);
            
            if existingTag is null then
				insert into Tags (tag) values (tagtoInsert);
			end if;
            
            insert into Stories_Tags (storyId, tag) values (storyIdInsert, tagtoInsert);
            
            -- loop iteration progress statements 
			set strLen = length(p_tags); 
            set substrLen = char_length(substring_index(p_tags, ",", 1)) + 2;
			set p_tags = mid(p_tags, substrLen,strLen);
            
			if p_tags = '' then
				leave do_this;
			end if;

		end loop do_this;
    
    select storyIdInsert as 'id', p_code as 'code';
	
END
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_EditStory`(
	in p_storyId int, 
    in p_title varchar(200),
    in p_story varchar(1000),
    in p_imageLink varchar(500),
    in p_siteLink varchar(200),
    in p_videoLink varchar(200),
	in p_tags varchar(150),
    in p_code varchar(10)
    
)
BEGIN
	declare strLen int default 0;
    declare substrLen int default 0;
    declare tagtoInsert varchar(50);
    declare existingTag varchar(50);
    
    update stories set title = p_title, story = p_story, imageLink = p_imageLink, siteLink = p_siteLink, videoLink = p_videoLink, tags = p_tags, code= p_code
    where storyId = p_storyId;
    
    delete from Stories_Tags where storyId = p_storyId;
    
    do_this:
		loop 
			set tagtoInsert = trim(substring_index(p_tags, "," , 1)); -- use this to insert into tags 
			set existingTag = (select tag from Tags where tag = tagtoInsert);
            
            if existingTag is null then
				insert into Tags (tag) values(tagtoInsert);
			end if;
			-- insert into Stories_Tags (storyId, tag) values(p_storyId, tagtoInsert);
			insert into Stories_Tags (storyId, tag) values (p_storyId, tagtoInsert);
            
              -- loop iteration progress statements 
			set strLen = length(p_tags); 
            set substrLen = char_length(substring_index(p_tags, ",", 1)) + 2;
			set p_tags = mid(p_tags, substrLen,strLen);
            
			if p_tags = '' then
				leave do_this;
			end if;

		end loop do_this;
        select p_storyId as 'id';
		
END