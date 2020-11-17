CREATE TABLE module( 
      id  INT  AUTO_INCREMENT    NOT NULL  , 
      name varchar  (255)   NOT NULL  , 
 PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 

CREATE TABLE module_student( 
      id  INT  AUTO_INCREMENT    NOT NULL  , 
      module_id int   NOT NULL  , 
      student_id int   NOT NULL  , 
 PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 

CREATE TABLE student( 
      id  INT  AUTO_INCREMENT    NOT NULL  , 
      name varchar  (255)   NOT NULL  , 
      email varchar  (255)   NOT NULL  , 
      RA varchar  (255)   NOT NULL  , 
      cpf varchar  (255)   NOT NULL  , 
 PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 

 
 ALTER TABLE module ADD UNIQUE (name);
 ALTER TABLE student ADD UNIQUE (email);
 ALTER TABLE student ADD UNIQUE (RA);
 ALTER TABLE student ADD UNIQUE (cpf);
  
 ALTER TABLE module_student ADD CONSTRAINT fk_module_student_1 FOREIGN KEY (module_id) references module(id); 
ALTER TABLE module_student ADD CONSTRAINT fk_module_student_2 FOREIGN KEY (student_id) references student(id); 

  
