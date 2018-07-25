var Example = Example || {};

Example.bridge = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Bounds = Matter.Bounds;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: true,
            hasBounds: true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var group = Body.nextGroup(true);

    var bridge = Composites.stack(160, 290, 15, 1, 0, 0, function(x, y) {
        return Bodies.rectangle(x - 20, y, 53, 20, {
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05,
            restitution: 1,
            render: {
                fillStyle: '#575375'
            }
        });
    });

    Composites.chain(bridge, 0.3, 0, -0.3, 0, {
        stiffness: 1,
        length: 0,
        restitution: 1,
        render: {
            visible: false
        }
    });

    var ball = Bodies.circle(100,100,10, { density: 0.0005, restitution: 0.95, frictionAir: 0, friction: .01, inertia: 99999 });

    World.add(world, [
        ball,
        Bodies.rectangle(700, 100, 150, 50, {
            isStatic: true,
            restitution: 1,
            friction: 0,
        }),
        Bodies.rectangle(100, 300, 50, 50, {
            isStatic: true,
            restitution: 1,
            friction: 1
        }),
        Bodies.rectangle(400, 250, 50, 50, {
            isStatic: true,
            restitution: 1,
            friction: 1
        }),
        Bodies.rectangle(600, 500, 50, 50, {
            isStatic: true,
            restitution: 1,
            friction: 1
        }),
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    return { ball: ball, engine: engine, render: render };

};


