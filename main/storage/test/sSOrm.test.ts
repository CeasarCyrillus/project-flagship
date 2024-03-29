import UseBeforeInitalizedError from "../error/useBeforeInitalizedError.ts"
import InitalizedMultipleTimesError from "../error/initalizedMultipleTimesError.ts"
import { assertNotEquals, assertStrContains, assertThrows, assert, assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { bgGreen, black, bgRed, yellow } from "https://deno.land/std/fmt/colors.ts";
import MockEntity from "./mockEntity.ts";
import sSOrm, { StorageLogLevel, Provider } from "../sSOrm.ts"

//#region sSOrm success
Deno.test(bgGreen(black("sSOrm")), () => {});
Deno.test("\t without config defaults to inMemory", () => {
    const db = new sSOrm()
    
    assertEquals(db.provider, Provider.inMemory);
});

Deno.test("\t without config log level is set to error only", () => {
    const db = new sSOrm()
    
    assertEquals(db.logLevel, StorageLogLevel.onlyError);
});

Deno.test("\t before initalized created is false", () => {
    const db = new sSOrm()
    
    assertEquals(db.created, false);
});

Deno.test("\t after initalized created is true", () => {
    const db = new sSOrm()
    
    db.init();

    assert(db.created);
});

Deno.test("\t return same repository", () => {
    const db = new sSOrm();
    db.init();

    const firstRepository = db.getRepository<MockEntity>("identifier");
    const secondRepository = db.getRepository<MockEntity>("identifier");

    assert(firstRepository == secondRepository);
})

Deno.test("\t different identifiers for the same type produce different repositories", () => {
    const db = new sSOrm();
    db.init();

    const firstRepository = db.getRepository<MockEntity>("identifier1");
    const secondRepository = db.getRepository<MockEntity>("identifier2");

    assert(firstRepository != secondRepository);
})
//#endregion

//#region sSorm throws
Deno.test(bgRed(black("sSOrm")), () => {});
Deno.test("\t throws if geting repository before created", () => {
    const db = new sSOrm();

    assertThrows(() => {
        db.getRepository<MockEntity>(MockEntity.name);
    }, UseBeforeInitalizedError)
});

Deno.test("\t throws if created more than once", () => {
    const db = new sSOrm();
    db.init();

    assertThrows(() => {
        db.init();
    }, InitalizedMultipleTimesError)
})

//#endregion