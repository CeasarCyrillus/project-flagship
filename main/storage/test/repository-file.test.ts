import { assertThrows, assertStrContains, assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { bgGreen, black } from "https://deno.land/std/fmt/colors.ts";
import MockEntity from "./mockEntity.ts";
import sSOrm, { Provider } from "../sSOrm.ts"

const getRepository = () => {
    const db = new sSOrm({ provider: Provider.file });
    db.init();
    return db.getRepository<MockEntity>(MockEntity.name);
}

Deno.test(bgGreen(black("Repository (file)")), () => {});
Deno.test("\t creates repository file when created", () => {
    const repo = getRepository();

    const fileName = repo.fileName!;
    Deno.openSync(fileName, {read: true, write: false}).close();
    
    repo.drop();
});

Deno.test("\t removes repository file when dropped", () => {
    const repo = getRepository();

    repo.drop();

    assertThrows(() => {
        Deno.openSync(repo.fileName!, {read: true, write: false}).close();
    }, Deno.errors.NotFound, "No such file or directory (os error 2)")
});


Deno.test("\t save entity to file when save is called", () => {
    const repo = getRepository();
    const entity = new MockEntity();
    entity.simpleStringField = "Hello World!";
    repo.add(entity);

    repo.save();

    const decoder = new TextDecoder();
    const content = Deno.readFileSync(repo.fileName!);
    assertStrContains(decoder.decode(content), "Hello World!");
    repo.drop();
});


Deno.test("\t data persists when loading new instance of sSOrm", () => {
    let repo = getRepository();
    const entity = new MockEntity();
    entity.simpleStringField = "Hello World!";
    const id = repo.add(entity);
    repo.save();

    repo = getRepository();

    assertEquals(repo.findOrThrow(id).simpleStringField, "Hello World!");
    repo.drop();
});