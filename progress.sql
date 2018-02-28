create or replace function displaymenu(out VARCHAR, out VARCHAR , out INTEGER) returns setof record as
$$
  select name, ingredients, price from menu;
$$
 language 'sql';

-- make a display order function

create or replace function displayorder(out text, out text, out text) returns setof record as
$$
--include ingredients + price here. learn how (triggers?)
  select name, coffee, quantity from breworder;
$$
 language 'sql';


create or replace function brewthis(in bname text, in bcoffee text, in bquantity text) returns text as
$$
  declare
    loc_res text;

  loc_name text;
  loc_coffee text;
  loc_quantity text;

  begin
    select into loc_name name, loc_coffee coffee, loc_quantity quantity from breworder;
     if bname NOTNULL then

       insert into breworder(name, coffee, quantity) values (bname, bcoffee, bquantity);
       loc_res = 'ok';
  else
       loc_res = 'Error';
     end if;
     return loc_res;
  end;
$$
 language 'plpgsql';


create or replace function deleteorder( in del text) returns text as
$$
  declare
    loc_res text;

  begin
    if del NOTNULL then

      DELETE from breworder;
       loc_res = 'ok';

     else
       loc_res = 'Error';
     end if;
     return loc_res;
  end;
$$
 language 'plpgsql';


create or replace function editorder( in ebname text, in ebcoffee text,  in ebquantity text) returns text as
$$
  declare
    loc_res text;
    loc_ebcoffee text;
    loc_ebname text;
    loc_ebquantity text;

  begin
     select into loc_ebname name, loc_ebcoffee coffee, loc_ebquantity quantity from breworder;
     if loc_ebname NOTNULL then

       UPDATE breworder set name = ebname, coffee = ebcoffee,  quantity = ebquantity;
       loc_res = 'ok';

     else
       loc_res = 'Error';
     end if;
     return loc_res;
  end;
$$
 language 'plpgsql';