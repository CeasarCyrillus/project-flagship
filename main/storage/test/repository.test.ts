import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { bgGreen, black, bold, red } from "https://deno.land/std/fmt/colors.ts";
import MockEntity from "./mockEntity.ts";
import sSOrm from "../sSOrm.ts"

const getRepository = () => {
    const db = new sSOrm();
    db.init();
    return db.getRepository<MockEntity>(MockEntity.name);
}

Deno.test(bgGreen(black("Repository")), () => {});
Deno.test("\t can add entity", () => {
    const repo = getRepository();
    const entity = new MockEntity();

    repo.add(entity);
});

Deno.test("\t update entity with stored entity id", () => {
    const repo = getRepository();
    const entity = new MockEntity();

    const storedEntityId = repo.add(entity);

    assertEquals(entity.id, storedEntityId);
    
});

Deno.test("\t can find stored entity", () => {
    const repo = getRepository();
    const entity = new MockEntity();
    const id = repo.add(entity);

    assertEquals(repo.find(id)?.simpleStringField, entity.simpleStringField);
});


Deno.test("\t return null no stored entity is found", () => {
    const repo = getRepository();
    const id = "randomId";

    assertEquals(null, repo.find(id));
});

Deno.test("\t return id when entity is added", () => {
    const repo = getRepository();
    const entity = new MockEntity();
    const id = repo.add(entity);

    assertEquals(entity.id, id);
});

Deno.test(bgGreen(black("Repository imutability")), () => {});
Deno.test("\t changing entity string field after adding entity does not change stored entitys string field", () => {
    const repo = getRepository();
    const entity = new MockEntity();
    entity.simpleStringField = "hello world!"
    const id = repo.add(entity);
    
    entity.simpleStringField = "not hello world";
    
    const storedEntity = repo.find(id)!;
    assertEquals(storedEntity.simpleStringField, "hello world!");
});


Deno.test("\t changing entity string field after getting entity does not change stored entitys string field", () => {
    const repo = getRepository();
    const entity = new MockEntity();
    entity.simpleStringField = "hello world!"
    const id = repo.add(entity);
    const storedEntity = repo.find(id)!;
    
    storedEntity.simpleStringField = "not hello world";
    
    assertEquals(repo.find(id)!.simpleStringField, "hello world!");
});


Deno.test("\t changing entity list field after adding entity does not change stored entitys list field", () => {
    const repo = getRepository();
    const entity = new MockEntity();
    entity.simpleList.push("hello world!");
    const id = repo.add(entity);
    
    entity.simpleList.push("not hello world");
    
    const storedEntity = repo.find(id)!;
    assertEquals(storedEntity.simpleList[1], undefined);
    assertEquals(storedEntity.simpleList.length, 1);
    assertEquals(storedEntity.simpleList[0], "hello world!");
});

Deno.test("\t changing entity list field after getting entity does not change stored entitys list field", () => {
    const repo = getRepository();
    const entity = new MockEntity();
    entity.simpleList.push("hello world!");
    const id = repo.add(entity);

    const storedEntity = repo.find(id)!;
    storedEntity.simpleList.push("not hello world");
    
    assertEquals(repo.find(id)!.simpleList[1], undefined);
    assertEquals(repo.find(id)!.simpleList.length, 1);
    assertEquals(repo.find(id)!.simpleList[0], "hello world!");
});


Deno.test(bgGreen(black("Repository parsing & limitations")), () => {});
Deno.test("\t parse undefined and null", () => {
    const repo = getRepository();
    const entity = new MockEntity();
    const id = repo.add(entity);
    const storedEntity = repo.find(id)!;
    
    assertEquals(storedEntity.undefined, undefined);
    assertEquals(storedEntity.null, null);
});

Deno.test(bold(red("\t translates NaN, Infinity, -Infinity to null")), () => {
    const repo = getRepository();
    const entity = new MockEntity();
    const id = repo.add(entity);
    const storedEntity = repo.find(id)!;
    
    assertEquals(storedEntity.NaN, null);
    assertEquals(storedEntity.infinity, null);
    assertEquals(storedEntity.signedInfinity, null);
});


Deno.test("\t correctly parses complex list of nightmares", () => {
    const repo = getRepository();
    const entity = new MockEntity();

    const nestedEntity = new MockEntity();
    const doubleNestedEntity = new MockEntity();

    doubleNestedEntity.simpleList.push("Hello World!");
    doubleNestedEntity.simpleStringField = "double nested";
    
    nestedEntity.complexNightmareList.push(doubleNestedEntity);
    nestedEntity.simpleStringField = "complex nightmare list! Buh!";

    entity.complexNightmareList.push(nestedEntity);
    entity.complexNightmareList.push(doubleNestedEntity);


    const id = repo.add(entity);
    const storedEntity = repo.find(id)!;
    
    assertEquals(storedEntity.complexNightmareList[0].complexNightmareList[0].simpleStringField, "double nested");
    assertEquals(storedEntity.complexNightmareList[0].complexNightmareList[0].simpleList[0], "Hello World!");

    assertEquals(storedEntity.complexNightmareList[1].simpleList[0], "Hello World!")
    assertEquals(storedEntity.complexNightmareList[1].simpleStringField, "double nested");

    assertEquals(storedEntity.complexNightmareList[0].simpleStringField, "complex nightmare list! Buh!");
});